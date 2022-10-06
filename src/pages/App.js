import { useState } from 'react';
import gitLogo from '../assets/github.png';
import Button from '../components/Button';
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';

import { Container } from './styles';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {

    const {data} = await api.get(`repos/${currentRepo}`)

    const isExit = repos.find(repo => repo.id === data.id)
    if(!isExit) {
      setRepos(prev => [...prev, data]);
      setCurrentRepo('')
      return
    }
    alert('Repositório não encontrado')
  }

  const handleRemoveRepo = (id) => {
    const {data} = api.get(`repos/${currentRepo}`)

    const removerId =repos.filter(repo => repo.id === data.id)
    if(!removerId) {
      setRepos(prev => [...prev, data]);
      setCurrentRepo('')
      return
    }
  }

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo" />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}
    </Container>
  );
}

export default App;
