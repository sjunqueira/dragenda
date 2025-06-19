export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="m-2 space-y-2">{children}</div>;
};

export const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-between">{children}</div>
  );
};

export const PageHeaderContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="space-y-1">{children}</div>;
};

export const PageHeaderTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="text-2xl font-bold">{children}</div>;
};

export const PageHeaderDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="text-muted-foreground text-sm">{children}</div>;
};

export const PageHeaderActions = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

export const PageContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-6 flex items-start gap-3 space-y-6">{children}</div>
  );
};
