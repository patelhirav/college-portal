-- DropIndex
DROP INDEX `Admin_superAdminId_fkey` ON `admin`;

-- DropIndex
DROP INDEX `Assignment_adminId_fkey` ON `assignment`;

-- DropIndex
DROP INDEX `Leave_userId_fkey` ON `leave`;

-- AlterTable
ALTER TABLE `assignment` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `leave` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `branch` ENUM('COMPUTER_SCIENCE', 'INFORMATION_TECHNOLOGY', 'MECHANICAL', 'ELECTRICAL', 'CIVIL', 'ARTIFICIAL_INTELLIGENCE') NOT NULL DEFAULT 'COMPUTER_SCIENCE';

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_superAdminId_fkey` FOREIGN KEY (`superAdminId`) REFERENCES `SuperAdmin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leave` ADD CONSTRAINT `Leave_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
