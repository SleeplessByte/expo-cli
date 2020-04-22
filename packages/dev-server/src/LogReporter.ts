import Log from '@expo/bunyan';
import { serializeError } from 'serialize-error';

export default class LogReporter {
  logger: Log;
  reportEvent: (event: any) => void;

  constructor(logger: Log, reportEvent: (event: any) => void = () => {}) {
    this.logger = logger;
    this.reportEvent = reportEvent;
  }

  update(event: any) {
    if ('error' in event && event.error instanceof Error) {
      event.error = serializeError(event.error);
    }
    // TODO(ville): replace xdl.PackagerLogsStream with a reporter to avoid serializing to JSON.
    this.logger.info({ tag: 'metro' }, JSON.stringify(event));
    this.reportEvent(event);
  }
}
