import React, { useState } from 'react';
import { TextInput, Textarea, Button, Row } from 'react-materialize';
// import NProgress from 'nprogress';

import { personalDataLink, emailHandlerLink } from '../../config';
import useAsyncHook from '../../helpers/useAsyncHook';
import renderContactField from '../../helpers/renderContactField';

const Contact = () => {
  const [personal] = useAsyncHook({ link: personalDataLink });
  const { contacts = {}, onContactsPage = [] } = personal;

  // data in form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // result of form submission
  const [formState, updateFormState] = useState({
    error: false,
    message: '',
    formSent: false
  });

  // TODO: do message clear after form change
  // clean message after form submit if write smth again
  // useEffect(() => {
  //   if(!formState.error && formState.message.length > 0) {
  //     updateFormState({
  //       ...formState,
  //       message: ''
  //     });
  //   }
  // }, [formData]);

  const sendEmail = (formUrl, payload) => {
    (async () => {
      const prepared = new FormData();
      prepared.append('json', JSON.stringify(payload));
      const rawResponse = await fetch(formUrl, {
        method: 'POST',
        body: prepared
      });
      const content = await rawResponse.json();
      updateFormState({
        ...content,
        formSent: true
      });
      // if form was sent correctly, clean the form fields
      if (!content.error) {
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }
    })();
  };
  
  return (
    <>
      <h1>Contact me</h1>
      <div className="contact-info">
        <p>Feel free to contact me!</p>
        <ul className="contact--info">
          {onContactsPage.map(objectKey => {
            if(objectKey in contacts) {
              return renderContactField(contacts[objectKey]);
            }
            return null;
          })}
        </ul>
      </div>
      <h2>Or send me a message!</h2>
      <form
        action={emailHandlerLink}
        method="post"
        onSubmit={e => {
          e.preventDefault();
          const formUrl = e.target.action;
          sendEmail(formUrl, formData);
        }}
      >
        <Row>
          <TextInput
            label="Name"
            name="name"
            placeholder="John Doe"
            required
            validate
            error="Fill the name, please"
            success="Great"
            s={6}
            m={6}
            l={6}
            xl={6}
            value={formData.name}
            onChange={e => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          <TextInput
            label="E-mail"
            name="email"
            placeholder="john@doe.com"
            required
            email
            validate
            error="Correct e-mail, please"
            success="Great"
            s={6}
            m={6}
            l={6}
            xl={6}
            value={formData.email}
            onChange={e => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <Textarea
            label="Message"
            name="message"
            placeholder="Hello, Konstantin! Here's a great job for you.."
            required
            validate
            error="Tell me something good, please"
            success="Great"
            s={12}
            m={12}
            l={12}
            xl={12}
            value={formData.message}
            onChange={e => {
              setFormData({ ...formData, message: e.target.value });
            }}
          />
          <Button type="submit" className="waves-effect waves-light">
            Send Message
          </Button>
          {formState.formSent && (
            <div
              className={
                formState.error ? 'red-text darken-3' : 'green-text darken-3'
              }
            >
              {formState.message}
            </div>
          )}
        </Row>
      </form>
    </>
  );
};

export default Contact;
