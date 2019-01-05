import { Component, OnInit, HostBinding } from '@angular/core';
import { Game } from '../../models/Game';
import { GamesService } from '../../services/games.service';
// Modulo para rutear internamente
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  viewEdit: Boolean = false;
  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  };
  // instanciamos GameService and Route
  constructor(
    private gameService: GamesService,
    private router: Router,
    private activeRouter: ActivatedRoute
    ) { }

  ngOnInit() {
    const params = this.activeRouter.snapshot.params;
    // console.log(params);
    if (params.id) {
      this.viewEdit = true;
      this.gameService.getGame(params.id).subscribe(
        res => this.game = res,
        err => {
          console.error(err, 'game no existe');
          this.router.navigate(['/games']);
        }
      );
    }
  }

  saveNewGame() {
    delete this.game.created_at;
    delete this.game.id;
    this.gameService.saveGame(this.game).subscribe(
      res => {
        console.log(res);
        this.game.title = '';
        this.game.description = '';
        this.game.image = '';
        this.router.navigate(['/games']);
      },
      err => console.error(err)
    );
  }
  editGame() {
    delete this.game.created_at;
    // console.log('Game editado');
    this.gameService.updateGame(this.game.id, this.game)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/games']);
        },
        err => console.log(err)
      );
  }
}
