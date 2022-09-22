import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import UsersPage from './pages/UsersPage';
import TodosPage from './pages/TodosPage';
import PostsPage from './pages/PostsPage';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux';
import store from './store/index';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/users' element={<UsersPage />} />
            <Route path='/todos' element={<TodosPage />} />
            <Route path='/posts' element={<PostsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
