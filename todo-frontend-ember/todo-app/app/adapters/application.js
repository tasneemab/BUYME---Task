import RESTAdapter from '@ember-data/adapter/rest';

export default class ApplicationAdapter extends RESTAdapter {
  // normal class body
  host = 'http://localhost:8000';
  namespace = 'api';

  // pathFoType(){
  //   return 'tasks';
  // }
}
