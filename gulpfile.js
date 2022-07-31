import pkg from 'gulp';
const {task, watch, src, dest, series, parallel} = pkg;
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import browserSync from 'browser-sync';
import cssnano from 'cssnano';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss'; 
import csscomb from 'gulp-csscomb';
import autoprefixer from'autoprefixer'; 
import mqpacker from 'css-mqpacker'; 
import sortCssMedia from'sort-css-media-queries'; 
import terser from 'gulp-terser'; 
import gulpConcat from 'gulp-concat'; 
// import delet from 'del'; 

const PLUGINS = [
  autoprefixer({
    overrideBrowserslist: ['last 5 versions', '> 1%'],
    cascade: true
  }), 
  mqpacker({
    sort: sortCssMedia 
  })
];

const PATH = {
  scssRoot: './assets/scss/style.scss',
  scssFiles: './assets/scss/**/*.scss',
  scssFolder: 'assets/scss/',
  cssFolder: './assets/css',
  cssMinFiles: './assets/css/**/*.min.css',
  htmlFiles: './*.html',
  jsFiles: [
    './assets/js/**/*.js',
    '!./assets/js/**/bundle.js',
    '!./assets/js/**/*.min.js'
  ],
  jsFolder: './assets/js/',
  jsBundleName: './bundle.js/',
  jsMinFiles: './assets/js/**/*.min.js',
  buildFolder: './dist'

};


 function scss() {
  return src(PATH.scssRoot)
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(PLUGINS))
  .pipe(csscomb('./yandex.json'))
  .pipe(dest(PATH.cssFolder))
  .pipe(browserSync.stream());
};

function scssMin() {

  const pluginsExtended = [...PLUGINS, cssnano({preset: 'default'})]; 

  return src(PATH.scssRoot)
  .pipe(sass().on('error', sass.logError))
  .pipe(csscomb('./yandex.json'))
  .pipe(postcss(pluginsExtended)) 
  .pipe(rename({suffix: '.min'}))
  .pipe(dest(PATH.cssFolder));
};

function scssDev() {
  return src(PATH.scssRoot, {sourcemaps: true})// путь от куда идет выгрузка файлов
  .pipe(sass().on('error', sass.logError))//отлавливает ошибки при измениении файловPATH.cssConfig
  .pipe(postcss(PLUGINS))//подключаем вендерные префиксы
  .pipe(dest(PATH.cssFolder, {sourcemaps: true}))// путь куда идет загрузкa нового файла стиль.css
  .pipe(browserSync.stream());
};

function comb() {
  return src(PATH.scssFiles)// путь от куда идет выгрузка файлов'
  .pipe(csscomb('./yandex.json'))
  .pipe(dest(PATH.scssFolder))// путь куда идет загрузко нового файла стиль.css
  
};

function suncInit() {
  browserSync.init({    // запуск страницы в браузере
    server: {
      baseDir: "./"     // точка входа в корне проекта
    }
  })
};

async function reload() {   // через асинхроную функцию перезагрузка страницы
  browserSync.reload();
};

function watchFiles() {           // для отслежевания файлов
  suncInit();                     // запуск страницы в браузере
  watch(PATH.scssFiles, scss)     // отслеживания всех файлов с указаной папки смотрим за стилями
  watch(PATH.htmlFiles, reload)   // отслеживания всех файлов с указаной папки смотрим за html
  watch(PATH.jsFiles, reload)     // отслеживания всех файлов с указаной папки смотрим за js
 };

 function concatJS() {
  return src(PATH.jsFiles)// путь от куда идет выгрузка файлов'
  .pipe(gulpConcat(PATH.jsBundleName))
  .pipe(dest(PATH.jsFolder))// путь куда идет загрузко нового файла стиль.js
};

function uglyfyJS() {
  return src(PATH.jsFiles)// путь от куда идет выгрузка файлов'
  .pipe(terser({
    toplevel: true,
    output: {quote_style: 3}    //настройка минимизации
  }))
  .pipe(rename({suffix: '.min'}))// добавляет файл .min перед выгрузкой что бы не изменять исходный файл, минимизация будет выполнена в другом файлу .min.js
  .pipe(dest(PATH.jsFolder))// путь куда идет загрузко нового файла стиль.js
};

function buildJS() {
  return src(PATH.jsMinFiles)// путь от куда идет выгрузка файлов'
  .pipe(dest(PATH.buildFolder + '/js'))// путь куда идет загрузко нового файла стиль.js
};

function buildHTML() {
  return src(PATH.htmlFiles)// путь от куда идет выгрузка файлов'
  .pipe(dest(PATH.buildFolder + '/templates'))// путь куда идет загрузко нового файла стиль.HTML
};

function buildCSS() {
  return src(PATH.cssMinFiles)// путь от куда идет выгрузка файлов'
  .pipe(dest(PATH.buildFolder + '/css'))// путь куда идет загрузко нового файла стиль.HTML
};

 async function clearFolder() {
  // await delet(PATH.buildFolder, {force: true})
  return true;
};

task('min', scssMin);                
task('dev', scssDev);                
task('scss', series(scss, scssMin));                        
task('watch', watchFiles);         
task('comb', comb);     
task('concat', concatJS);   
task('uglyfy', uglyfyJS);    
task('build',  series(clearFolder, buildJS, buildHTML, buildCSS));

