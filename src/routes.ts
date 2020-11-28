import { Router } from 'express';
import { IndexController } from "./controllers/Index";
import { ContactController } from "./controllers/Contact";
import { CoursesController } from "./controllers/Courses";
import { AssetsController } from "./controllers/Assets";
import { EventsController } from "./controllers/Events";
import { VirtualClassesController } from "./controllers/VirtualClasses";
import { AuthenticationController } from "./controllers/Authentication";

export class Routes {

  public index: IndexController = new IndexController();
  public contact: ContactController = new ContactController();
  public courses: CoursesController = new CoursesController();
  public assets: AssetsController = new AssetsController();
  public events: EventsController = new EventsController();
  public virtualClasses: VirtualClassesController = new VirtualClassesController();
  public authentication: AuthenticationController = new AuthenticationController();

  public routes(app): void {

    app.route('/').get(this.index.root);
    app.route('/home').get(this.index.getHome);

    app.route('/contact')
    .get(this.contact.getContact)
    .post(this.contact.postContact);

    app.route('/courses').get(this.courses.getCourses);

    app.route('/events').get(this.events.getEvents)
    .put(this.events.putEvents)
    .post(this.events.postEvents);

    app.route('/events/:id').delete(this.events.deleteEvents);

    app.route('/events/search').get(this.events.getAllEvents);


    app.route('/virtualClasses').get(this.virtualClasses.getVirtualClasses);

    app.route('/css/:remaining').get(this.assets.getCSS);
    app.route('/js/:remaining').get(this.assets.getJS);
    app.route('/images/:remaining').get(this.assets.getImages);
    app.route('/js/greensock/:remaining').get(this.assets.getGreensock);
    app.route('/admin/:remaining').get(this.assets.getGreensock);
    app.route('/api/authenticate').post(this.authentication.authentication);
  }
}