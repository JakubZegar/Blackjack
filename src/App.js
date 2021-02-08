import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Menu from './pages/MenuPage/Menu';
import Game from './pages/GamePage/Game';
import Rank from './pages/RankPage/Rank';
import {Background} from './components/Background'

function App() {
  return (
    <Background>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Menu} exact />
          <Route path="/game" component={Game} exact />
          <Route path="/rank" component={Rank} exact />
        </Switch>
      </BrowserRouter>
    </Background>
  );
}

export default App;
