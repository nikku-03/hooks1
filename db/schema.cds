namespace eventsdemo;
using { cuid, managed } from '@sap/cds/common';

entity Students: cuid, managed{
    StudentID: Integer;
    Name: String(100);
    Course: String(50);
    Score: Integer;
}