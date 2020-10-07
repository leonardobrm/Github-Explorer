import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import logoImg from '../../assets/Logo.svg';

import { Title, Form, Repositories, Error, Main, DeleteButton } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  id: number;
}

const Dashboard: React.FC = () => {
  const [inputError, setInputError] = useState('');
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@githubExplorer:repositories',
    );
    if (storagedRepositories) return JSON.parse(storagedRepositories);
    return [];
  });
  useEffect(() => {
    localStorage.setItem(
      '@githubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Enter the author/name of the repository');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const verifyRepositoryExists = repositories.findIndex(
        repository => repository.id === response.data.id,
      );

      if (verifyRepositoryExists !== -1) {
        setInputError('repositorio ja adicionado');
        return;
      }
      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (error) {
      setInputError('Error searching for this repository');
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function handleDeleteRepository(id: number) {
    const findRepository = repositories.filter(
      repository => repository.id !== id,
    );

    setRepositories(findRepository);
  }
  return (
    <>
      <img src={logoImg} alt="Github explorer" />
      <Title>Explore repositories without Github.</Title>
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="type the name of the repository"
        />
        <button type="submit"> Search </button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Main key={repository.id}>
            <Link to={`repositories/${repository.full_name}`}>
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>
              <FiChevronRight size={20} />
            </Link>
            <DeleteButton>
              <button
                onClick={() => handleDeleteRepository(repository.id)}
                type="button"
              >
                <AiFillDelete size={20} />
              </button>
            </DeleteButton>
          </Main>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
