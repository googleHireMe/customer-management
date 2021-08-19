import { GenericApi } from "../../core/api/generic-api";

export class CustomerDependentApi<T, L = T> extends GenericApi<T, L> {

  updateCurrentCustomerId(id: string): void {
    this._apiPrefix = `${this.baseApiPrefix}/${id}/${this.dependentEntityPath}`;
  }

  constructor(
    protected readonly baseApiPrefix: string,
    protected dependentEntityPath: string  
  ) {
    super(baseApiPrefix);
  }
}