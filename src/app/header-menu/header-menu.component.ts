import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.scss'
})
export class HeaderMenuComponent {

  topic_menus: any[] = [];
  topic_menu_subs: any[] = [];

  constructor(private router: Router) {
    this.topic_menus = [
      {topic_menu: "Multimedia Perception", id: 1, fontawesome: "fa-solid fa-brain"},
      {topic_menu: "Multimedia Retrieval", id: 2, fontawesome: "fa-solid fa-eye"}
    ]

    this.topic_menu_subs = [
      { topic_menu_sub: "Object Detection", id_menu: 1, url: "perception/reltr-ssg" },
      { topic_menu_sub: "Scene Graph Generation", id_menu: 1, url: "perception/reltr-ssg" },
      { topic_menu_sub: "Region Description", id_menu: 1, url: "perception/reltr-ssg" },
      
      { topic_menu_sub: "Retrieval Based on Scene Graph", id_menu: 2, url: "retrieval/retrieval-IRESGCL" }
    ]
  }

  navigateTo(url: string) {
      this.router.navigateByUrl(url);
  }

  getSubsByMenuId(menuId: number) {
    return this.topic_menu_subs.filter(sub => sub.id_menu === menuId);
  }

}
