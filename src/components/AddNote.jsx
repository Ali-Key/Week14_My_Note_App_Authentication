import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAddNotesMutation } from '../store/api/NoteSlice';
import { useNavigate } from 'react-router-dom';

const AddNote = () => {
  const navigate = useNavigate();

  const [addNotes ] = useAddNotesMutation();

  const initialValues = {
    title: '',
    content: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    addNotes({
      title: values.title,
      content: values.content,
    }).then(() => {
      navigate("/")
       
    });
    

    resetForm();
  };

  return (
    <div className="bg-blue-800 p-20 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-5">
            <Field
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="border border-gray-300 shadow p-6 w-full rounded mb-"
            />
            <ErrorMessage name="title" component="div" className="text-red-500" />
          </div>

          <div className="mb-5">
            <Field
              as="textarea"
              name="content"
              placeholder="Body"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="content" component="div" className="text-red-500" />
          </div>

          <button
            type="submit"
            className="block w-full bg-yellow-500 text-blue-800 font-bold p-4 rounded-lg hover:bg-yellow-400"
          >
            Add Note
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddNote;
