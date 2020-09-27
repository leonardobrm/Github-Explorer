import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/Logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github explorer" />
      <Title>Explore repositories without Github.</Title>
      <Form>
        <input placeholder="type the name of the repository" />
        <button type="submit"> Search </button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars1.githubusercontent.com/u/52158381?s=460&u=24c3e7aec5d93076fde3d87fc3e42fd9267b0367&v=4"
            alt="leonardo brasil"
          />
          <div>
            <strong>strong</strong>
            <p>testando descriçao</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img
            src="https://avatars1.githubusercontent.com/u/52158381?s=460&u=24c3e7aec5d93076fde3d87fc3e42fd9267b0367&v=4"
            alt="leonardo brasil"
          />
          <div>
            <strong>strong</strong>
            <p>testando descriçao</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img
            src="https://avatars1.githubusercontent.com/u/52158381?s=460&u=24c3e7aec5d93076fde3d87fc3e42fd9267b0367&v=4"
            alt="leonardo brasil"
          />
          <div>
            <strong>strong</strong>
            <p>testando descriçao</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
