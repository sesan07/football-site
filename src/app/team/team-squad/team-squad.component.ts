import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TeamPlayer} from '../../shared/models/team-player.model';
import {RepositoryService} from '../../shared/services/repository.service';
import {Observable} from 'rxjs';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-team-squad',
  templateUrl: './team-squad.component.html',
  styleUrls: ['./team-squad.component.scss']
})
export class TeamSquadComponent implements OnInit, OnChanges {
  @Input() teamId: number;

  squad: [string, TeamPlayer[]][] = [];
  isLoading: boolean;

  constructor(private repositoryService: RepositoryService, private datePipe: DatePipe) { }

  private static isList(response: number[] | Observable<number[]>) {
    return (response as number[]).length !== undefined;
  }

  ngOnInit(): void {
    this.setUp();
  }

  setUp() {
    this.isLoading = true;

    const response = this.repositoryService.getSeasons();
    if (TeamSquadComponent.isList(response)) {
      this.processSquad(response as number[]);
    } else {
      (response as Observable<number[]>).subscribe((seasons: number[]) => {
        this.processSquad(seasons);
      }, () => {
        this.isLoading = false;
      });
    }
  }

  private processSquad(seasons: number[]) {
    if (seasons.length === 0 ) {
      this.isLoading = false;
      return;
    }

    const seasonIndex = seasons.indexOf(+this.datePipe.transform(new Date(), 'yyyy'));
    if (seasonIndex === -1) {
      this.isLoading = false;
      return;
    }

    this.repositoryService.getTeamSquad(this.teamId, seasons[seasonIndex].toString()).subscribe((players: TeamPlayer[]) => {
      const playerMap = new Map<string, TeamPlayer[]>();
      players.forEach(player => {
        if (playerMap.has(player.position)) {
          playerMap.get(player.position).push(player);
        } else {
          playerMap.set(player.position, [player]);
        }
      });

      this.squad = Array.from(playerMap);
      this.squad.forEach(position => {
        position[1].sort((a, b) => a.firstname.localeCompare(b.firstname));
      });

      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.teamId.firstChange) {
      this.setUp();
    }
  }

}
