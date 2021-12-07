import React from 'react';
import './styles.scss';

interface HeaderProps {
	black: boolean;
}

export default function Header({ black } : HeaderProps){
	return (
		<header className={black ? 'black' : ''}>
			<div className="headerLogo">
				<a href="/">
					<img src="images/netflix.svg" alt="Netflix" />
				</a>
			</div>
			<div className="headerUser">
				<a href="/">
					<img src="images/avatar.png" alt="Avatar User" />
				</a>
			</div>
		</header>
	);
}