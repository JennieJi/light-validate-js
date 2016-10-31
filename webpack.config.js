module.exports = {
	entry: {
		validate: './validate.js',
		validator: './validator.js'
	},
	output: {
		path: __dirname + '/dist',
		filename: 'Validator.[name].js',
		library: ['Validator', '[name]'],
		libraryTarget: 'commonjs2'
	},
	module: {
		loaders: [
			{
		      test: /\.js$/,
		      exclude: /(node_modules|bower_components)/,
		      loader: 'babel', // 'babel-loader' is also a valid name to reference
		      query: {
		        presets: ['es2015']
		      }
		    }
		]
	}	
};