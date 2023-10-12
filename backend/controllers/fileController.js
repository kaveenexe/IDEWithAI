// controllers/fileController.js
const File = require("../models/filemodel");

// Create a new file
exports.createFile = async (req, res) => {
  try {
    const { name, content } = req.body;
    const file = new File({ name, content });
    await file.save();
    res.status(201).json(file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create file" });
  }
};

// Get all files
exports.getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch files" });
  }
};

// Update a file by ID
exports.updateFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, content } = req.body;

    const file = await File.findByIdAndUpdate(
      id,
      { name, content },
      { new: true }
    );

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.json(file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update file" });
  }
};

// Delete a file by ID
exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await File.findByIdAndRemove(id);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete file" });
  }
};

exports.getFileContent = async (req, res) => {
  try {
    // Find the file by ID in your database
    const { id } = req.params;

    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.json({ content: file.content });
  } catch (error) {
    console.error("Error fetching file content:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a file's content by ID
exports.updateFileContent = async (req, res) => {
  try {
    const fileId = req.params.id;
    const newContent = req.body.content;

    // Find the file by its ID
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Update the content of the file
    file.content = newContent;
    await file.save();

    return res
      .status(200)
      .json({ message: "File content updated successfully" });
  } catch (error) {
    console.error("Error updating file content:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getFileDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findOne({ _id: id }).select(
      "name createdDate lastModifiedDate"
    );

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.json(file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch file details" });
  }
};


// ========================== Get count of files
exports.getCountOfFiles = async (req, res) => {
  try {
    const count = await File.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch file count" });
  }
};

// Extract file details
exports.extractFileDetails = async (req, res) => {
  try {
    const { code, fileId } = req.body;

    // Parse the JavaScript code
    const parsedCode = esprima.parseScript(code);

    // Extract variables, keywords, and function names
    const codeDetails = {
      variables: [],
      keywords: [],
      functions: [],
    };

    // Function to recursively traverse the parsed code and extract details
    function traverse(node) {
      if (node.type === "VariableDeclaration") {
        node.declarations.forEach((declaration) => {
          codeDetails.variables.push(declaration.id.name);
        });
      } else if (node.type === "FunctionDeclaration") {
        codeDetails.functions.push(node.id.name);
      }

      for (const key in node) {
        if (node[key] && typeof node[key] === "object") {
          traverse(node[key]);
        }
      }
    }

    traverse(parsedCode);

    // JavaScript keywords
    const jsKeywords = [
      "break",
      "case",
      "catch",
      "class",
      "const",
      "continue",
      "debugger",
      "default",
      "delete",
      "do",
      "else",
      "enum",
      "export",
      "extends",
      "false",
      "finally",
      "for",
      "function",
      "if",
      "implements",
      "import",
      "in",
      "instanceof",
      "interface",
      "let",
      "new",
      "null",
      "package",
      "private",
      "protected",
      "public",
      "return",
      "static",
      "super",
      "switch",
      "this",
      "throw",
      "true",
      "try",
      "typeof",
      "var",
      "void",
      "while",
      "with",
      "yield",
    ];

    // Filter out JavaScript keywords from the variables
    codeDetails.variables = codeDetails.variables.filter(
      (variable) => !jsKeywords.includes(variable)
    );

    // Update the File model with the code details
    const file = await File.findByIdAndUpdate(fileId, { codeDetails });

    res.json(codeDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
