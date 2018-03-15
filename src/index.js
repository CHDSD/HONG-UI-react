import './font/css/fontello.css';

if (process.env.NODE_ENV !== 'production') {
	console.log('Looks like we are in development mode!');
}

export { default as Calendar } from './Calendar';
export { default as SideMenu } from './SideMenu';
export { default as Pagination } from './Pagination';
export { default as Tabs } from './Tabs';
// export { default as Popup } from './Popup';
