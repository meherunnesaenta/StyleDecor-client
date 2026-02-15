import React from 'react';
import Loading from '../components/Loading/Loading';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden.jsx/Forbidden';


const DecoratorRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'decorator') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default DecoratorRoute;