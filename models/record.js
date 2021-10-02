class Record {
  constructor(
    TaskName,
    JobCode,
    User,
    Company,
    Database,
    DataInstance,
    ExecutedOn,
    TerminatedOn,
    ExecutionType,
    MailSent
  ) {
    this.TaskName = TaskName;
    this.JobCode = JobCode;
    this.User = User;
    this.Company = Company;
    this.Database = Database;
    this.DataInstance = DataInstance;
    this.ExecutedOn = ExecutedOn;
    this.TerminatedOn = TerminatedOn;
    this.ExecutionType = ExecutionType;
    this.MailSent = MailSent;
  }
}

module.exports = Record;
