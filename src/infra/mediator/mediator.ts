export class Mediator {
  obervers: {
    event: string;
    callback: Function;
  }[];

  constructor() {
    this.obervers = [];
  }

  on(event: string, callback: Function) {
    this.obervers.push({ event, callback });
  }

  async publish(event: string, data: unknown) {
    for (const observer of this.obervers) {
      if (observer.event === event) {
        await observer.callback(data);
      }
    }
  }
}
