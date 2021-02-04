import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Menu from './pages/MenuPage/Menu';
import Game from './pages/GamePage/Game';
import Help from './pages/HelpPage/Help'
import Rank from './pages/RankPage/Rank';
import Options from './pages/OptionsPage/Options';
import {Background} from './components/Background'

function App() {
  return (
    <Background>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Menu} exact />
          <Route path="/game" component={Game} exact />
          <Route path="/help" component={Help} exact />
          <Route path="/rank" component={Rank} exact />
          <Route path="/options" component={Options} exact />
        </Switch>
      </BrowserRouter>
    </Background>
  );
}

export default App;
