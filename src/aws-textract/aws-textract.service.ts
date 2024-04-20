import { Injectable } from '@nestjs/common';
import {
  AnalyzeExpenseCommand,
  AnalyzeExpenseCommandInput,
  TextractClient,
} from '@aws-sdk/client-textract';
import { fromIni } from '@aws-sdk/credential-providers';

// Set the AWS Region.
const REGION = 'us-east-2'; //e.g. "us-east-1"
const profileName = 'default';

@Injectable()
export class AWSTextractService {
  private textractClient;
  constructor() {
    this.textractClient = new TextractClient({
      region: REGION,
      credentials: fromIni({ profile: profileName }),
    });
  }

  async analyzeInvoice(params: AnalyzeExpenseCommandInput) {
    try {
      const aExpense = new AnalyzeExpenseCommand(params);
      const response = await this.textractClient.send(aExpense);
      //console.log(response)
      // response?.ExpenseDocuments?.forEach((doc) => {
      //   doc?.LineItemGroups?.forEach((items) => {
      //     items?.LineItems?.forEach((fields) => {
      //       fields?.LineItemExpenseFields?.forEach((expenseFields) => {
      //         console.log(expenseFields);
      //       });
      //     });
      //   });
      // });
      // console.log(response);
      return response; // For unit tests.
    } catch (err) {
      throw new Error(err);
    }
  }
}
