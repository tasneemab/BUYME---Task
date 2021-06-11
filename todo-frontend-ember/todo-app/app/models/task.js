import Model, { attr } from '@ember-data/model';

export default class TaskModel extends Model {
  @attr('string') task;
  @attr('boolean') completed;
}
