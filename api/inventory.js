/**
 * Inventory Management Logic
 */

class Inventory {
    constructor() {
        this.parts = [];
        this.scanHistory = [];
    }

    getParts() {
        return this.parts;
    }

    stockIn(qrData) {
        // Format: 001&10/10/2025&2450616-T&80&MJ5121J4
        const partsArr = qrData.split('&');
        if (partsArr.length < 5) {
            throw new Error('Invalid QR Format');
        }

        const partNo = partsArr[2];
        const qty = parseInt(partsArr[3]);
        const refId = partsArr[4];

        if (this.scanHistory.includes(refId)) {
            throw new Error('Duplicate QR Code');
        }

        let part = this.parts.find(p => p.partNo === partNo);
        if (!part) {
            // In a real system, we might reject unknown parts or create them
            part = {
                id: Date.now().toString(),
                partNo: partNo,
                current: 0,
                qtyStock: 1000,
                isUrgent: false,
                boxes: []
            };
            this.parts.push(part);
        }

        part.current += qty;
        this.scanHistory.push(refId);

        return { partNo, qty, refId };
    }

    toggleUrgent(partId) {
        const part = this.parts.find(p => p.id === partId);
        if (!part) {
            throw new Error('Part not found');
        }
        part.isUrgent = !part.isUrgent;
        return part;
    }
}

module.exports = Inventory;
