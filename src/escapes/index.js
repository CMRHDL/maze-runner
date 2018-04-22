import { escape } from './v1';

const addId = ({ name, id, ...props }) => ({
  ...props,
  name,
  id: id || name,
});

const escapes = [{ name: 'version 1', fn: escape, color: '#304F42' }].map(addId);

export { escapes };
