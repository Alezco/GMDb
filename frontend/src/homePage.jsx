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

      	    <nav class="navbar navbar-fixed-top navbar-inverse" role="navigation">
      			<div class="container-fluid">

      				<div class="navbar-header">
      					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
      						<span class="sr-only">Toggle navigation</span>
      						<span class="icon-bar"></span>
      						<span class="icon-bar"></span>
      						<span class="icon-bar"></span>
      					</button>
      					<a class="navbar-brand" href="#">Sitename</a>
      				</div>

      				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      					<ul class="nav navbar-nav">
      						<li><a href="#">Nav item 1</a></li>
      						<li><a href="#">Nav item 2</a></li>
      						<li><a href="#">Nav item 3</a></li>
      					</ul>
      				</div>
      			</div>
      		</nav>

      		<div class="container-fluid">
      			<div class="row">
      				<div class="col-sm-12">
      					<div class="page-header">
      						<h1>Bootstrap four column image gallery</h1>
      						<p>Posted by <span class="glyphicon glyphicon-user"></span> <a href="#">Matthijs Jansen</a> on <span class="glyphicon glyphicon-time"></span> 12 January 2015 10:00 am</p>
      					</div>
      				</div>
      			</div>

      			<div class="row margin-b-2">
      				<div class="col-sm-6 col-md-3">
      					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div class="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div class="col-sm-6 col-md-3">
      					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div class="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div class="col-sm-6 col-md-3">
      					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div class="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div class="col-sm-6 col-md-3">
      					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div class="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      			</div>

      			<div class="row margin-b-2">
      				<div class="col-sm-6 col-md-3">
      					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div class="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div class="col-sm-6 col-md-3">
      					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div class="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div class="col-sm-6 col-md-3">
      					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div class="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div class="col-sm-6 col-md-3">
      					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div class="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      			</div>

      			<div class="row margin-b-2">
      				<div class="col-sm-6 col-md-3">
      					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div class="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div class="col-sm-6 col-md-3">
      					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div class="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div class="col-sm-6 col-md-3">
      					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div class="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div class="col-sm-6 col-md-3">
      					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div class="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      			</div>

      			<div class="row margin-b-2">
      				<div class="col-sm-6 col-md-3">
      					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div class="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div class="col-sm-6 col-md-3">
      					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div class="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div class="col-sm-6 col-md-3">
      					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div class="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      				<div class="col-sm-6 col-md-3">
      					<img class="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
      					<div class="caption">
      						<h4><a href="#">Image title</a></h4>
      						<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      					</div>
      				</div>
      			</div>
      			<footer class="margin-tb-3">
      				<div class="row">
      					<div class="col-lg-12">
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
