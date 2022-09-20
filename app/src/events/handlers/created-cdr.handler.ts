import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedCdrEvent } from '../impl/cdrCreatedEvent.event';
import { yellowBright } from 'cli-color';

@EventsHandler(CreatedCdrEvent)
export class CreatedCdrHandler implements IEventHandler<CreatedCdrEvent> {
  handle() {
    console.log(yellowBright('[event]'), ' CreatedCdr...');
  }
}
