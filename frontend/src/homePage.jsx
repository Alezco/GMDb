import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');
import styles from './style/index.css';

class HomePage extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return(
    <div>
      	<head>
      		<title>Page title - Sitename</title>
      	</head>
      	<body>

      	    <nav className="navbar navbar-fixed-top navbar-inverse" role="navigation">
      			<div className="container-fluid">

      				<div className="navbar-header">
      					<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
      						<span className="sr-only">Toggle navigation</span>
      						<span className="icon-bar"></span>
      						<span className="icon-bar"></span>
      						<span className="icon-bar"></span>
      					</button>
      					<a className="navbar-brand" href="#">Sitename</a>
      				</div>

      				<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      					<ul className="nav navbar-nav">
      						<li><a href="#">Nav item 1</a></li>
      						<li><a href="#">Nav item 2</a></li>
      						<li><a href="#">Nav item 3</a></li>
      					</ul>
      				</div>
      			</div>
      		</nav>

      		<div className="container-fluid">
      			<div className="row">
      				<div className="col-sm-12">
      					<div className="page-header">
      						<h1>Bootstrap four column image gallery</h1>
      						<p>Posted by <span className="glyphicon glyphicon-user"></span> <a href="#">Matthijs Jansen</a> on <span className="glyphicon glyphicon-time"></span> 12 January 2015 10:00 am</p>
      					</div>
      				</div>
      			</div>

      			<div className="row margin-b-2">
      				<div className="col-sm-6 col-md-3">
      					<img className="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div className="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div className="col-sm-6 col-md-3">
      					<img className="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div className="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div className="col-sm-6 col-md-3">
      					<img className="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div className="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div className="col-sm-6 col-md-3">
      					<img className="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div className="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      			</div>

      			<div className="row margin-b-2">
      				<div className="col-sm-6 col-md-3">
      					<img className="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div className="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div className="col-sm-6 col-md-3">
      					<img className="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div className="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div className="col-sm-6 col-md-3">
      					<img className="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div className="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div className="col-sm-6 col-md-3">
      					<img className="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div className="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      			</div>

      			<div className="row margin-b-2">
      				<div className="col-sm-6 col-md-3">
      					<img className="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div className="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div className="col-sm-6 col-md-3">
      					<img className="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div className="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div className="col-sm-6 col-md-3">
      					<img className="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div className="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div className="col-sm-6 col-md-3">
      					<img className="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div className="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      			</div>

      			<div className="row margin-b-2">
      				<div className="col-sm-6 col-md-3">
      					<img className="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div className="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div className="col-sm-6 col-md-3">
      					<img className="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div className="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div className="col-sm-6 col-md-3">
      					<img className="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div className="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div className="col-sm-6 col-md-3">
      					<img className="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div className="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      			</div>
      			<footer className="margin-tb-3">
      				<div className="row">
      					<div className="col-lg-12">
      						<p>Copyright &copy; Sitename 2015</p>
      					</div>
      				</div>
      			</footer>
      		</div>
        </body>
    </div>

      );
  }
}

export default HomePage;
