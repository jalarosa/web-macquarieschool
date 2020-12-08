import * as fs from 'fs';
import { Menu , Message } from "./models"
import { simpleSessionStorage } from "simple-storage";

const es : Message = JSON.parse(fs.readFileSync(__dirname + '/assets/data/lang_es.min.json', 'utf8'));
const en : Message = JSON.parse(fs.readFileSync(__dirname + '/assets/data/lang_en.min.json', 'utf8'));

simpleSessionStorage.setItem("languaje", "es");

export function getLanguaje(): string {
  return simpleSessionStorage.getItem("languaje");
}

export function setLanguaje(value: string): void {
  simpleSessionStorage.setItem("languaje", value);
}


export function getMenu(index: number, lang: string): Menu[] {
  const data = getData(lang);
  const langParam = "?lang=" + lang;
  const menu = [{name: data.Home.value, action: 'home' + langParam, className: undefined, isModal: false},
              {name: data.Courses.value, action: 'courses' + langParam, className: undefined, isModal: false},
              {name: data.VirtualClasses.value, action: 'virtualClasses' + langParam, className: undefined, isModal: false},
              {name: data.Contact.value, action: 'contact' + langParam, className: undefined, isModal: false},
              {name: data.Event.value, action: 'events' + langParam, className: undefined, isModal: true}];
  menu[index].className = 'current';
  return menu;
}

export function getData(lang: string): Message {
    if (lang === "es") {
        return es;
      } else {
        return en;
    }
}
