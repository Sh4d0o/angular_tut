import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  // styles:["heroes button:hover {color: red;    background-color: lightskyblue;    left: .1em;  }"],
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {

  // hero: Hero = { id: 1, name: 'Windstorm' };

  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  selectedHero?: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected ${hero.name} (id=${hero.id})`);
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
