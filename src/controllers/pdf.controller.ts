import { Request, Response } from "express";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
interface Item {
  name: string;
  description: string;
  productId: string;
  quantity: number;
  subtotal: number;
}
export async function pdf(req: Request, res: Response) {
  try {
    const cssPath = path.join(__dirname, "styles.css");
      
    const cssContent = fs.readFileSync(cssPath, "utf8");
        
    const items: Item[] = [
      {
        name: "Wordpress Template",
        description:
          "Reference site about Lorem Ipsum, giving information on its origins.",
        productId: "#50000981",
        quantity: 9,
        subtotal: 5000.0,
      },
      {
        name: "Maxwell Admin Template",
        description: "As well as a random Lipsum generator.",
        productId: "#50000126",
        quantity: 5,
        subtotal: 100.0,
      },
    ];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const itemRows = items.map(
      (item) => `
      <tr>
        <td>
          ${item.name}
          <p class="m-0 text-muted">${item.description}</p>
        </td>
        <td>${item.productId}</td>
        <td>${item.quantity}</td>
        <td>$${item.subtotal.toFixed(2)}</td>
      </tr>
    `
    );
    const htmlContent = `
    <style>${cssContent}</style>
    <div class="container">
    <div class="row gutters">
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
    <div class="card">
    <div class="card-body p-0">
    <div class="invoice-container">
        <div class="invoice-header">
        <div class="row gutters">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div class="custom-actions-btns mb-5">
                <a href="#" class="btn btn-primary">
                    <i class="icon-download"></i> Download
                </a>
                <a href="#" class="btn btn-secondary">
                    <i class="icon-printer"></i> Print
                </a>
            </div>
        </div>
    </div>
    <div class="row gutters">
    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
        <a href="index.html" class="invoice-logo">
            Bootdey.com
        </a>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6">
        <address class="text-right">
            Maxwell admin Inc, 45 NorthWest Street.<br>
            Sunrise Blvd, San Francisco.<br>
            00000 00000
        </address>
    </div>
</div>
<div class="row gutters">
<div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
    <div class="invoice-details">
        <address>
            Alex Maxwell<br>
            150-600 Church Street, Florida, USA
        </address>
    </div>
</div>
<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
    <div class="invoice-details">
        <div class="invoice-num">
            <div>Invoice - #009</div>
            <div>January 10th 2020</div>
        </div>
    </div>													
</div>
</div>
<!-- Row end -->
</div>

      <div class="invoice-body">
        <div class="row gutters">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="table-responsive">
              <table class="table custom-table m-0">
                <thead>
                  <tr>
                    <th>Items</th>
                    <th>Product ID</th>
                    <th>Quantity</th>
                    <th>Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRows.join("")}
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="invoice-footer">
      Thank you for your Business.
  </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  `;
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Gerar o PDF
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    // Enviar o PDF como resposta da rota
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="fatura.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).send(error);
  }
}
