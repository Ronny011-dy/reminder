import { v1 as uuidv1 } from 'uuid';

const idGenerator = () => uuidv1();

const dateParser = (date: number) => new Date(date).toLocaleDateString('de-DE');

export { idGenerator, dateParser };
