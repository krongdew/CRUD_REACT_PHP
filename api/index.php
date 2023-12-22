<?php
	/**
	* Database Connection
	*/
	class DbConnect {
		private $server = 'localhost';
		private $dbname = 'admin_kkdesign';
		private $user = 'admin';
		private $pass = 'Dew@0875350828#';

		public function connect() {
			try {
				$conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}
        
	}
?>