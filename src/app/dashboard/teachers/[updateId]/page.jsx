import React from 'react';

const UpdateTeacherPage = async({params}) => {
const {updateId} = await params;
console.log('Id:', updateId);
  return (
    <div>
      UpdateTeacherPage
    </div>
  );
};

export default UpdateTeacherPage;