export interface IDetailNode {
  title: string | null;
  description: string | null;
  titleCapsule: string | null;
  colorBg: string | null;
  colorText: string | null;

}

export interface ICommit {
  type?: string;
  description: string;
  title: string;
  createdBy: string;
  createdAt: Date | number | null;
  approvedAt?: Date | number | null;
  approvedBy?: string | null;
  sequence: number;
  elements: any[];
  pools: any[];
}
