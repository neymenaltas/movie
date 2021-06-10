import {ListState} from './state-models/list-state.model';
import {FormState} from './state-models/form-state.model';

export interface AppState {
  list: ListState;
  form: FormState;
}
