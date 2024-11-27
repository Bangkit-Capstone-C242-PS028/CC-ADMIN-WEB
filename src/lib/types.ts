export type Doctor = {
  uid: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  specialization: string;
  workplace: string;
  isVerified: number;
  documentUrl: string | null;
};

export interface DoctorApprovalDashboardProps {
  doctors: Doctor[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
  showPending: boolean;
  showDocument: boolean;
}
