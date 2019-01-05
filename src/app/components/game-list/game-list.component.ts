import { Component, OnInit, HostBinding } from '@angular/core';

import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  games: any = [];

  constructor(private gamesService: GamesService) { }

  ngOnInit() {
    this.getAllGames();
  }
  getAllGames() {
    this.gamesService.getGames().subscribe(
      res => {
        this.games = res;
      },
      err => console.error(err),
    );
  }
  deleteGame(id: string) {
    // console.log(id);
    this.gamesService.deleteGame(id).subscribe(
      res => {
        console.log(res);
        this.getAllGames();
      },
      err => console.error(err)
    );
  }
  // editGame(id: string) {
  //   console.log('Game to edid -> ' + id);
  // }
}
