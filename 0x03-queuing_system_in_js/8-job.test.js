import sinon from 'sinon';
import createPushNotificationsJobs from './8-job.js';
import { createQueue } from 'kue';
import { expect } from 'chai';

describe('createPushNotificationsJobs', () => {
  const QUEUE = createQueue({ name: 'job_notification' });
  const CONSOLE_SPY = sinon.spy(console);

  before(() => {
    QUEUE.testMode.enter(true);
  });

  after(() => {
    QUEUE.testMode.clear();
    QUEUE.testMode.exit();
  });

  afterEach(() => {
    CONSOLE_SPY.log.resetHistory();
  });

  it('adds jobs to the queue', (done) => {
    expect(QUEUE.testMode.jobs.length).to.equal(0);
    const jobs = [
      {
        phoneNumber: '0123456789',
        message: 'Your One Time pin is 2134.',
      },
      {
        phoneNumber: '12098745443',
        message: 'Your One Time pin is 2134.',
      },
    ];
    createPushNotificationsJobs(jobs, QUEUE);
    expect(QUEUE.testMode.jobs.length).to.equal(2);
    expect(QUEUE.testMode.jobs[0].data).to.deep.equal(jobs[0]);
    expect(CONSOLE_SPY.calledTwice).to.be.true;
    expect(QUEUE.testMode.jobs[0].type).to.equal('job_notification_1');
    QUEUE.process('job_notification_1', () => {
      expect(
        CONSOLE_SPY.log
          .calledWith('Notification job created:', QUEUE.testMode.jobs[0].id)
      ).to.be.true;
      done();
    });
  });

  it('displays an error message when the job data type is not an array', () => {
    expect(
      createPushNotificationsJobs.bind(createPushNotificationsJobs, {}, QUEUE)
    ).to.throw('Jobs must be an array');
  });

  it('registers the progress event handler for a job', (done) => {
    QUEUE.testMode.jobs[0].addListener('progress', () => {
      expect(
        CONSOLE_SPY.log
          .calledWith('Notification job', QUEUE.testMode.jobs[0].id, '38% complete')
      ).to.be.true;
      done();
    });
    QUEUE.testMode.jobs[0].emit('progress', 38);
  });

  it('registers the complete event handler for a job', (done) => {
    QUEUE.testMode.jobs[0].addListener('complete', () => {
      expect(
        CONSOLE_SPY.log
          .calledWith('Notification job', QUEUE.testMode.jobs[0].id, 'completed')
      ).to.be.true;
      done();
    });
    QUEUE.testMode.jobs[0].emit('complete');
  });

  it('registers the failed event handler for a job', (done) => {
    QUEUE.testMode.jobs[0].addListener('failed', () => {
      expect(
        CONSOLE_SPY.log
          .calledWith('Notification job', QUEUE.testMode.jobs[0].id, 'failed:', 'Failed to send')
      ).to.be.true;
      done();
    });
    QUEUE.testMode.jobs[0].emit('failed', new Error('Failed to send'));
  });
});
