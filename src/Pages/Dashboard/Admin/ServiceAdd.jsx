import React from 'react';
import AddServiceForm from '../../../components/forms/AddServiceForm';
import ServicesManage from '../../../components/Admin/ServicesManage';

const ServiceAdd = () => {
  return (
    <div>
        <AddServiceForm></AddServiceForm>
        <ServicesManage></ServicesManage>
    </div>
  );
};

export default ServiceAdd;