import { Router } from 'express';
import { IndexController } from "./controllers/Index";
import { ContactController } from "./controllers/Contact";
import { CoursesController } from "./controllers/Courses";
import { AssetsController } from "./controllers/Assets";
import { EventsController } from "./controllers/Events";
import { VirtualClassesController } from "./controllers/VirtualClasses";

export class Routes {

  public index: IndexController = new IndexController();
  public contact: ContactController = new ContactController();
  public courses: CoursesController = new CoursesController();
  public assets: AssetsController = new AssetsController();
  public events: EventsController = new EventsController();
  public virtualClasses: VirtualClassesController = new VirtualClassesController();

  public routes(app): void {

    app.route('/').get(this.index.root);
    app.route('/home').get(this.index.getHome);

    app.route('/contact')
    .get(this.contact.getContact)
    .post(this.contact.postContact);

    app.route('/courses').get(this.courses.getCourses);

    app.route('/events').get(this.events.getEvents);

    app.route('/virtualClasses').get(this.virtualClasses.getVirtualClasses);

    app.route('/css/:remaining').get(this.assets.getCSS);
    app.route('/js/:remaining').get(this.assets.getJS);
    app.route('/images/:remaining').get(this.assets.getImages);
    app.route('/js/greensock/:remaining').get(this.assets.getGreensock);
  }
}