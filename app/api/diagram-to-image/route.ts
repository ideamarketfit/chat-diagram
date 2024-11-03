import { NextRequest, NextResponse } from 'next/server';
import { run } from '@mermaid-js/mermaid-cli';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const { diagramDefinition, diagramTitle } = await req.json();

    if (!diagramDefinition) {
      return NextResponse.json({ error: 'Diagram definition is required' }, { status: 400 });
    }

    const inputFilePath = path.join('/tmp', `${uuidv4()}.mmd`);
    const outputFilePath = path.join('/tmp', `${uuidv4()}.png`) as `${string}.png`;

    // Write the diagram definition to a file
    fs.writeFileSync(inputFilePath, diagramDefinition);

    // Generate the diagram using mermaid-cli with transparent background
    await run(inputFilePath, outputFilePath, {
      outputFormat: 'png',
    });

    // Read the generated image
    const imageBuffer = fs.readFileSync(outputFilePath);

    // Clean up files
    fs.unlinkSync(inputFilePath);
    fs.unlinkSync(outputFilePath);

    // Use the provided diagram title or default to 'diagram'
    const fileName = diagramTitle ? `${diagramTitle}.png` : 'diagram.png';

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error('Error generating diagram:', error);
    return NextResponse.json({ error: 'Error generating diagram' }, { status: 500 });
  }
} 