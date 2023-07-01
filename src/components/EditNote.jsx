import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {  useGetNotesQuery, useUpdateNotesMutation } from '../store/api/NoteSlice';

const EditNote = () => {

  const [updateNotes ] = useUpdateNotesMutation();
  const { data: allNotes = [] } = useGetNotesQuery();

  const params = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    title: '',
    content: '',
  });

  
  useEffect(() => {
    const note = allNotes.find((note) => note.id === Number(params.id));
    if (note) {
      setInitialValues({
        title: note.title,
        content: note.content,
      });
    }
  }, [allNotes, params.id]);



  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
  });

  const handleSubmit = (values) => {
 
    updateNotes({
      id: Number(params.id),
      updatedNotes: values,
    })

    navigate("/");
    
  };

  return (
    <div className="bg-blue-800 p-20 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form>
          <div className="mb-5">
            <Field
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
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
            className="block w-full bg-yellow-400 text-blue-800 font-bold p-4 rounded-lg hover:bg-yellow-500"
          >
            Update Note
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditNote;
