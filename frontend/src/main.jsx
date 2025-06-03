import ReactDOM from 'react-dom/client';
import App from './Layout/Layout.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./style/styles.css";
import Insert, { sendData } from "./Insert/Insert.jsx";
import Show, { getBlog } from "./Show/Show.jsx";
import Edit, { editData} from "./Edit/Edit.jsx";
import Home, { getAllBlogs } from './Home/Home.jsx';

const router = createBrowserRouter([

    { 
        path: "/", 
        element: <App />, 
        children: [ 
            { 
                path: "insert",
                element: <Insert />,
                action: sendData
            },
            {
                path: "edit/:id",
                element: <Edit />,
                loader: getBlog,
                action: editData
            }, 
            {
                path: "show/:id",
                element: <Show />,
                loader: getBlog
            }, 
            {
                path: "",
                element: <Home />,
                loader: getAllBlogs
            },
        ]
    }
    
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);

