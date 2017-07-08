"use strict";

const babel = require( "gulp-babel" );
const debug = require( "gulp-debug" );
const del = require( "del" );
const gulp = require( "gulp" );
const plumber = require( "gulp-plumber" );
const rename = require( "gulp-rename" );
const replace = require( "gulp-replace" );
const sourcemap = require( "gulp-sourcemaps" );

const clientPattern = /\/\/\:\s*\@client\:(.+?|[^]+?)\/\/\:\s*\@end\-client/gm;
const serverPattern = /\/\/\:\s*\@server\:(.+?|[^]+?)\/\/\:\s*\@end\-server/gm;

gulp.task( "server", function formatClient( ){
	return gulp.src( "*.module.js" )
		.pipe( plumber( ) )
		.pipe( debug( { "title": "File:" } ) )
		.pipe( replace( clientPattern, "" ) )
		.pipe( rename( ( path ) => {
			path.basename = path.basename.replace( ".module", "" );
			return path;
		} ) )
		.pipe( gulp.dest( "./" ) );
} );

gulp.task( "client", function formatServer( ){
	return del( "*.support.js" ).then( ( ) => {
		gulp.src( "*.module.js" )
			.pipe( plumber( ) )
			.pipe( debug( { "title": "File:" } ) )
			.pipe( replace( serverPattern, "" ) )
			.pipe( rename( ( path ) => {
				path.basename = path.basename.replace( ".module", ".support" );
				return path;
			} ) )
			.pipe( sourcemap.init( ) )
			.pipe( babel( ) )
			.pipe( sourcemap.write( "./" ) )
			.pipe( gulp.dest( "./" ) );
	} );
} );

gulp.task( "default", [ "client", "server" ] );
