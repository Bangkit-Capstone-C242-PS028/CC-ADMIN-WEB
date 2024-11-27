import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AcceptDoctorButton } from "../approve-button";
import { Doctor } from "@/lib/types";

interface DoctorTableProps {
  doctors: Doctor[];
}

export function DoctorTable({ doctors }: DoctorTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Specialization</TableHead>
          <TableHead>Workplace</TableHead>
          <TableHead>Verification Status</TableHead>
          <TableHead>Document</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {doctors.map((doctor) => (
          <TableRow key={doctor.uid}>
            <TableCell>{`${doctor.firstName || ""} ${
              doctor.lastName || ""
            }`}</TableCell>
            <TableCell>{doctor.email || "N/A"}</TableCell>
            <TableCell>{doctor.specialization}</TableCell>
            <TableCell>{doctor.workplace}</TableCell>
            <TableCell>
              <Badge
                variant={doctor.isVerified === 1 ? "default" : "secondary"}>
                {doctor.isVerified === 1 ? "Verified" : "Pending"}
              </Badge>
            </TableCell>
            <TableCell>
              {doctor.documentUrl ? (
                <a
                  href={doctor.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline">
                  View Document
                </a>
              ) : (
                "No document"
              )}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <AcceptDoctorButton
                  uid={doctor.uid}
                  isVerified={doctor.isVerified}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
