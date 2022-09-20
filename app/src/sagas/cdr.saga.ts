import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import * as cli from 'cli-color';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CreatePaymentCommand } from '../commands/impl/create-payment.command';
import { CreatedCdrEvent } from '../events/impl/cdrCreatedEvent.event';

@Injectable()
export class CdrSagas {
  @Saga()
  cdrCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CreatedCdrEvent),
      delay(1000),
      map((event) => {
        console.log(
          cli.magentaBright('[saga]'),
          ` ${CreatedCdrEvent.name} -> ${CreatePaymentCommand.name}`,
        );
        return new CreatePaymentCommand(event.cdrId);
      }),
    );
  };
}
