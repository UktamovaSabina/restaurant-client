import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';


// components import
import Header from './components/header/Header';
import Restaurant from './components/restaurants/Restaurant';
import Foods from './components/foods/Food';
import Login from './components/login/Login';
import AddRestaurant from './components/restaurants/AddRestaurant';
import FoodAdd from './components/foods/FoodAdd';
import FoodEdit from './components/foods/FoodEdit';
import OrderForm from './components/order/OrderForm';
import OrdersList from './components/order/OrdersList';
import Cart from './components/cart/Cart'
import EditRestaurant from './components/restaurants/EditRestaurant';

const client = new ApolloClient({
  link: createUploadLink({
    uri: "http://localhost:4000/graphql",
  }),
  cache: new InMemoryCache()
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <><Header /><Restaurant /></>
  },
  {
    path: '/foods/:id',
    element: <><Header /><Foods /></>
  },
  {
    path: '/food',
    element: <><Header /><FoodAdd /></>
  },
  {
    path: '/food/:id',
    element: <><Header /><FoodEdit /></>
  },
  {
    path: '/login',
    element: <><Header /><Login /></>
  },
  {
    path: '/restaurant',
    element: <><Header /><AddRestaurant /></>
  },
  {
    path: '/restaurant/:id',
    element: <><Header /><EditRestaurant /></>
  },
  {
    path: '/order',
    element: <><Header /><OrderForm /></>
  },
  {
    path: '/orders',
    element: <><Header /><OrdersList /></>
  },
  {
    path: '/cart',
    element: <><Header /><Cart /></>
  }
])

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='container'>
        <RouterProvider router={router}/>
      </div>
    </ApolloProvider>
  );
}

export default App;